import * as fs from 'fs';
import * as YAML from 'yaml';



const scenarioData = fs.readFileSync('ScenarioData.yml', 'utf8');
const parsedData = YAML.parse(scenarioData);

fs.writeFileSync('scenarioData.json', JSON.stringify(parsedData, null, 2));