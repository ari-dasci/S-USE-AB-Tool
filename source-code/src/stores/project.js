import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useProjectsStore } from '../stores/projects';

export const useProjectStore = defineStore('project', {
    state: () => ({
        project: null,
        alternatives: [
            {
                id: 'c0c076ba-6f9e-4398-ad24-05cb20c4299a',
                alias: 'UGR',
                url: 'https://ugr.es',
                logo: ''
            }
        ]
    }),
    actions: {
        async getProject(id) {
            const { projects } = useProjectsStore();
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.project = projects.find(e => e.id === id);
        },
        async createAlternative({ alias, url }) {
            const id = uuid();
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.alternatives.push({ id, alias, url });
        },
        async deleteAlternative(id) {
            console.log(id);
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.alternatives = this.alternatives.filter(a => a.id != id);
        }
    }
});
