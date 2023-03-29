import {getBiasedRandomNumber} from './generalUtils';


const weatherAdjectives = [
    'climate',
    'climate-change',
    'meteorology',
    'seasonal',
    'spell',
    'weather-forecast',
    'zone',
    'balmy',
    'blistering',
    'dog-days',
    'heatwave',
    'indian-summer',
    'scorcher',
    'sunny',
    'thaw',
    'the-heat',
    'tropical',
    'bleak',
    'biting',
    'brisk',
    'crisp',
    'fresh',
    'frosty',
    'hard',
    'harsh',
    'icy',
    'raw',
    'snowy',
    'calm',
    'clear',
    'clement',
    'cloudless',
    'equable',
    'fair',
    'fine',
    'pleasant',
    'still',
    'temperate',
    'windless',
    'bone-dry',
    'fierce',
    'foul',
    'gale-force',
    'gusty',
    'harsh',
    'humid',
    'muggy',
    'murky',
    'severe',
    'sultry',
    'threatening',
    'torrential',
    'unseasonable',
    'windy',
    'bank',
    'billow',
    'blizzard',
    'cirrocumulus',
    'cirrostratus',
    'cirrus',
    'cloudy',
    'column',
    'cumulonimbus',
    'cumulus',
    'dull',
    'fog',
    'fogbound',
    'foggy',
    'gather',
    'grey',
    'hurricane',
    'inclement',
    'lower',
    'mist',
    'misty',
    'nimbus',
    'overcast',
    'pall',
    'pea-souper',
    'scud',
    'sea-mist',
    'storm-cloud',
    'squall',
    'thundercloud',
    'tsunami',
    'typhoon',
    'vapour',
    'vog',
    'break',
    'break-through',
    'brighten-up',
    'clear-up',
    'close-in',
    'cloud',
    'ease',
    'fickle',
    'lift',
    'melt-away',
    'thaw',
    'track',
];
const landscapeNouns = [
    'cliffs',
    'stream',
    'ocean',
    'desert',
    'waterfall',
    'forest',
    'caves',
    'cave',
    'river',
    'volcano',
    'hill',
    'mountain',
    'lake',
    'rocks',
    'valley',
    'shore',
    'beach',
    'dunes',
    'rocks',
    'seas',
    'sea',
    'glaciers',
    'rainforest',
    'city',
    'village',
    'town',
    'piano',
    'cat',
    'alpes',
    'glacier',
    'snowlands',
    'island',
    'planet',
    'asteroid',
    'mansion',
    'mountain-king',
    'plain',
    'grasslands',
    'prairie',
    'heathland',
    'savanna',
    'tundra',
    'underwater',
    'cavernous',
];

export const getRandomName = () => {
    return `${weatherAdjectives[getBiasedRandomNumber(0, weatherAdjectives.length - 1)]}-${landscapeNouns[getBiasedRandomNumber(0, landscapeNouns.length - 1)]}-${getBiasedRandomNumber(0, 9)}${getBiasedRandomNumber(0, 9)}${getBiasedRandomNumber(0, 9)}`;
};