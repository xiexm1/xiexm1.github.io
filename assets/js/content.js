// Add YAML parser
import jsyaml from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.mjs';

async function loadYAML(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const text = await response.text();
        return jsyaml.load(text);
    } catch (error) {
        console.error(`Error loading YAML from ${path}:`, error);
        return null;
    }
}

function renderEducation(data, containerId = 'education-list') {
    const el = document.getElementById(containerId);
    if (!el || !data?.education) return;
    
    el.innerHTML = data.education.map(item => `
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow mb-4">
            <div class="flex justify-between items-start">
                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-lg font-semibold text-primary">${item.degree}</h4>
                        <span class="text-gray-600 text-sm">${item.period}</span>
                    </div>
                    <div class="text-gray-700">
                        <span class="font-medium">${item.institution}</span>
                        ${item.location ? ` · ${item.location}` : ''}
                    </div>
                    ${item.advisor ? `
                        <div class="text-gray-600 text-sm mt-1">
                            Advisor: ${item.advisor}
                        </div>
                    ` : ''}
                    ${item.details ? `
                        <p class="text-gray-600 text-sm mt-2">
                            ${item.details}
                        </p>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderConferences(data, containerId = 'conferences-list') {
    const el = document.getElementById(containerId);
    if (!el || !data?.conferences) return;

    const sortedConferences = [...data.conferences].sort((a, b) => b.year - a.year);
    
    el.innerHTML = sortedConferences.map(conf => `
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div class="flex items-start">
                <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 mt-1">
                    <i class="fa fa-${conf.icon || 'users'} text-accent"></i>
                </div>
                <div class="flex-grow">
                    <h3 class="text-lg font-semibold mb-2 text-dark">${conf.name}</h3>
                    <p class="text-gray-600 mb-1">${conf.location} | ${conf.period}</p>
                    ${conf.presentations ? `
                        <p class="text-gray-700 text-sm mt-2">
                            <span class="font-medium">Contributions:</span> 
                            ${conf.presentations.map(pres => `
                                <span class="inline-flex items-center">
                                    <i class="fa fa-${pres.type.toLowerCase().includes('poster') ? 'picture-o' : 'microphone'} 
                                       text-accent mr-1"></i>
                                    ${pres.type}
                                </span>
                            `).join(' · ')}
                        </p>
                    ` : ''}
                    ${conf.link ? `
                        <a href="${conf.link}" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center text-primary hover:underline mt-2 text-sm">
                            <i class="fa fa-external-link mr-1"></i> Conference Details
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize content when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const [educationData, conferencesData] = await Promise.all([
        loadYAML('/assets/data/education.yml'),
        loadYAML('/assets/data/conferences.yml')
    ]);

    renderEducation(educationData);
    renderConferences(conferencesData);
});
