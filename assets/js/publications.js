const ORCID_ID = '0000-0002-7925-4964';
const AUTHOR_NAME = 'Xiaoming Xie';
const ORCID_API_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

async function fetchCrossrefData(doi) {
    try {
        const response = await fetch(`https://api.crossref.org/works/${doi}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching Crossref data:', error);
        return null;
    }
}

function formatAuthors(authors) {
    return authors.map(author => {
        const name = author.given ? `${author.given} ${author.family}` : author.family;
        return name === AUTHOR_NAME ? `<strong class="text-primary">${name}</strong>` : name;
    }).join(', ');
}

async function fetchPublications() {
    try {
        const response = await fetch(ORCID_API_URL, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch publications');
        }

        const data = await response.json();
        const publications = data.group || [];
        
        // Sort publications by year (newest first)
        publications.sort((a, b) => {
            const yearA = a['work-summary'][0]['publication-date']?.year?.value || 0;
            const yearB = b['work-summary'][0]['publication-date']?.year?.value || 0;
            return yearB - yearA;
        });

        // Format and display publications
        const publicationsArray = await Promise.all(publications.map(async pub => {
            const work = pub['work-summary'][0];
            const year = work['publication-date']?.year?.value || '';
            const title = work.title?.['title']?.value || '';
            const journal = work['journal-title']?.value || '';
            const doi = work['external-ids']?.['external-id']?.find(id => id['external-id-type'] === 'doi')?.['external-id-value'] || '';
            
            // Get additional details from Crossref
            const crossrefData = doi ? await fetchCrossrefData(doi) : null;
            const authors = crossrefData?.author ? formatAuthors(crossrefData.author) : '';
            const volume = crossrefData?.volume || '';
            const issue = crossrefData?.issue || '';
            const pages = crossrefData?.page || '';
            const publishedDate = crossrefData?.published?.['date-parts']?.[0] || [];
            const formattedDate = publishedDate.length > 0 ? publishedDate.join('-') : year;
            
            return `
                <div class="bg-neutral rounded-xl p-5 hover:shadow-md transition-shadow">
                    <h3 class="text-gray-900 font-medium mb-2">${title}</h3>
                    <p class="text-gray-700 text-sm mb-2">
                        ${authors}
                    </p>
                    <p class="text-gray-600 text-sm">
                        <em>${journal}</em>${volume ? `, Volume ${volume}` : ''}${issue ? `, Issue ${issue}` : ''}${pages ? `, Pages ${pages}` : ''} (${formattedDate})
                    </p>
                    ${doi ? `<p class="text-sm mt-2">
                        <a href="https://doi.org/${doi}" target="_blank" class="text-primary hover:underline flex items-center">
                            <i class="fa fa-external-link mr-1"></i>
                            DOI: ${doi}
                        </a>
                    </p>` : ''}
                </div>
            `;
        }));
        
        const publicationsHtml = publicationsArray.join('');

        // Update the publications container
        const publicationsContainer = document.getElementById('publications-list');
        if (publicationsContainer) {
            publicationsContainer.innerHTML = publicationsHtml;
        }

    } catch (error) {
        console.error('Error fetching publications:', error);
        // Show error message to user
        const publicationsContainer = document.getElementById('publications-list');
        if (publicationsContainer) {
            publicationsContainer.innerHTML = `
                <div class="bg-red-50 text-red-600 p-4 rounded-lg">
                    Failed to load publications. Please try again later.
                </div>
            `;
        }
    }
}

// Refresh publications when page loads
document.addEventListener('DOMContentLoaded', fetchPublications);
