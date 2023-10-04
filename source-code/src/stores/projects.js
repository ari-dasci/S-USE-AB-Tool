import { LoremIpsum } from 'lorem-ipsum';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
const evaluationCriteria = [
    {
        id: uuid(),
        alias: 'SUS',
        title: 'System usability scale',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        id: uuid(),
        alias: 'NPS',
        title: 'Net promoter score',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        id: uuid(),
        alias: 'Usability test',
        title: 'Set of activities for LMS',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        id: uuid(),
        alias: 'ACC',
        name: lorem.generateSentences(1),
        instructions: lorem.generateParagraphs(1),
        scale: '5^5'
    }
];

const roles = [
    {
        id: uuid(),
        title: 'Blind',
        subtitle: 'Permanent visual impairment.',
        category: 1
    },
    {
        id: uuid(),
        title: 'One arm',
        subtitle: 'Permanent visual impairment.',
        category: 2
    },
    {
        id: uuid(),
        title: 'Deaf',
        subtitle: 'Situationaly visual impairment ',
        category: 3
    },
    {
        id: uuid(),
        title: 'Non verbal',
        subtitle: 'Situationaly visual impairment ',
        category: 4
    },
    {
        id: uuid(),
        title: 'Cataratas',
        subtitle: 'Permanent visual impairment.',
        category: 1
    },
    {
        id: uuid(),
        title: 'Arm injury',
        subtitle: 'Permanent visual impairment.',
        category: 2
    },
    {
        id: uuid(),
        title: 'Ear infection',
        subtitle: 'Permanent visual impairment.',
        category: 3
    },
    {
        id: uuid(),
        title: 'Laryngitis',
        subtitle: 'Permanent visual impairment.',
        category: 4
    },
    {
        id: uuid(),
        title: 'Distracted',
        subtitle: 'Permanent visual impairment.',
        category: 1
    },
    {
        id: uuid(),
        title: 'New parent',
        subtitle: 'Permanent visual impairment.',
        category: 2
    },
    {
        id: uuid(),
        title: 'Bartender',
        subtitle: 'Permanent visual impairment.',
        category: 3
    },
    {
        id: uuid(),
        title: 'Heavy accent',
        subtitle: 'Permanent visual impairment.',
        category: 4
    }
];

const roleCategories = [
    {
        id: 1,
        title: 'see',
        icon: 'visibility_off',
        color: 'red'
    },
    {
        id: 2,
        title: 'touch',
        icon: 'personal_injury',
        color: 'green'
    },
    {
        id: 3,
        title: 'hear',
        icon: 'hearing_disabled',
        color: 'blue'
    },
    {
        id: 4,
        title: 'speak',
        icon: 'voice_over_off',
        color: 'yellow'
    }
];

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        evaluationCriteria,
        roles,
        roleCategories
    }),
    getters: {
        getProjectById: state => {
            const projects = state.projects;
            return projectId => projects.find(project => project.id === projectId);
        },
        groupedRoles: state =>
            state.roles.reduce((acc, curr) => {
                if (!(curr.category in acc)) {
                    acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
            }, {}),
        roleCategoriesMap: state =>
            state.roleCategories.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {})
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
