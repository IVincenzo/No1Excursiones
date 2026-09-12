import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const output = path.join(root, 'src/data/legacy');
fs.mkdirSync(output, {recursive: true});

const documentMock = {
  documentElement: {lang: 'en'},
  addEventListener() {},
  querySelector() { return null; },
  querySelectorAll() { return []; },
};
const context = {
  window: {},
  document: documentMock,
  localStorage: {getItem() { return null; }, setItem() {}},
  URLSearchParams,
  location: {search: ''},
  CustomEvent: class {},
  Date,
  Map,
  console,
};
context.window.location = context.location;
context.window.dispatchEvent = () => {};
context.window.addEventListener = () => {};
vm.createContext(context);

let i18nSource = fs.readFileSync(path.join(root, 'assets/js/i18n.js'), 'utf8');
i18nSource = i18nSource.replace('window.No1I18n = {', 'window.__messages = translations; window.No1I18n = {');
vm.runInContext(i18nSource, context);

let activitiesSource = fs.readFileSync(path.join(root, 'assets/js/api.js'), 'utf8');
activitiesSource = activitiesSource.replace('window.No1Excursiones = {', 'window.__activityDefinitions = activityDefinitions; window.No1Excursiones = {');
vm.runInContext(activitiesSource, context);

fs.writeFileSync(path.join(output, 'messages.json'), `${JSON.stringify(context.window.__messages, null, 2)}\n`);
fs.writeFileSync(path.join(output, 'activities.json'), `${JSON.stringify(context.window.__activityDefinitions, null, 2)}\n`);
let eventsSource = fs.readFileSync(path.join(root, 'assets/js/events.js'), 'utf8');
eventsSource = eventsSource.replace('function t(key) {', 'window.__eventDefinitions = eventDefinitions; window.__eventCategories = categoryTranslations; function t(key) {');
vm.runInContext(eventsSource, context);
fs.writeFileSync(path.join(output, 'events.json'), `${JSON.stringify({categories: context.window.__eventCategories, events: context.window.__eventDefinitions}, null, 2)}\n`);
console.log('Extracted legacy messages and activities.');
