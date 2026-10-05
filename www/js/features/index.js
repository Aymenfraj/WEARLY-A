// Enregistre toutes les fonctions : ecrans, menu, accueil, theme du pays. Pour ajouter une fonction : un dossier + une ligne ici.
import './session.js';
import './wardrobe/view.js';
import './market/view.js';
import './seller/view.js';
import './discover/view.js';
import './privacy/view.js';
import * as sty from './stylist/view.js';
import * as her from './discover/heritage.js';
import * as menu from './menu.js';
import * as tele from '../core/telemetry.js';
import { U } from '../ui/kit.js';
const A = U();
window.WEARLY_MENU = menu.html;
const home = A.V.home;
A.V.home = () => home().replace('Salaam aleykum', her.greeting()).replace(/(<div class="mu">[^<]*<\/div>)/, '$1' + sty.homeCard() + her.card());
A.onRender(() => { her.strip(); tele.track('screen', { screen: A.S.tab }); });
sty.loadWeather();
