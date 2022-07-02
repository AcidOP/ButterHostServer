export function checkModerator(id) {

    const { ModeratorID, juniorModeratorID } = require('../config.json');
    const isModerator = id === ModeratorID || id === juniorModeratorID;
    return isModerator;

}