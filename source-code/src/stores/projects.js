import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: []
    }),
    getters: {
        getProjectById: state => {
            const projects = state.projects;
            return projectId => projects.find(project => project.id === projectId);
        }
    },
    actions: {
        async createProject({ title, logo, start, end }) {
            const id = uuid();
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.projects.push({ id, title, logo, start, end });
        },
        deleteProject(projectId) {
            this.projects = this.projects.filter(p => p.id != projectId);
        }
    },
    persist: true
});
