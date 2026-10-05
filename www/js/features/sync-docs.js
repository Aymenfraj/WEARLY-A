// Quels morceaux de l'application sont sauvegardes sur le serveur (un document par module).
import * as sync from '../core/sync.js';
const U = window.WEARLY_UI;
sync.register('profile', () => ({ prof: U.S.prof, obData: U.S.obData }), d => { Object.assign(U.S.prof, d.prof || {}); if (U.S.obData) Object.assign(U.S.obData, d.obData || {}); });
sync.register('vestiaire', () => (U.S.vest ? { mine: U.S.vest.mine, reqs: U.S.vest.reqs } : {}), d => { if (U.S.vest) { if (d.mine) U.S.vest.mine = d.mine; if (d.reqs) U.S.vest.reqs = d.reqs; } });
