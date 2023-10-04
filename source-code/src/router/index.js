import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';
import HomeView from '../views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/projects',
                component: () => import('../views/ProjectsView.vue')
            },
            {
                path: '/tests',
                component: () => import('../views/TestsView.vue')
            },
            {
                path: '/projects/create',
                component: () => import('../views/CreateProjectView.vue')
            },
            {
                path: '/projects/:project/wizard',
                name: 'wizard',
                component: () => import('../views/WizardView.vue')
                // children: [
                // {
                //     path: '1',
                //     component: () => import('../components/ProjectAlternativesList.vue')
                // },
                // {
                //     path: '2',
                //     component: () => import('../components/ProjectCriteriaSelection.vue')
                // },
                // {
                //     path: '3',
                //     component: () => import('../components/Step3Table.vue')
                // },
                // {
                //     path: '4',
                //     component: () => import('../components/Step4Table.vue')
                // },
                // {
                //     path: '5',
                //     component: () => import('../components/Step5Table.vue')
                // },
                // {
                //     path: '6',
                //     component: () => import('../components/Step6Table.vue')
                // }
                // ]
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('../views/ProfileView.vue')
            }
        ]
    },
    {
        path: '/sign-up',
        name: 'signUp',
        component: () => import('../views/SignUpView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useUserStore();
    if (!isAuthenticated && to.name !== 'signUp') {
        next({ name: 'signUp' });
    } else {
        next();
    }
});

export default router;
