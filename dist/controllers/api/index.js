"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("../../apis/github");
exports.searchGitUser = async (req, res, next) => {
    const { languages, username } = req.body;
    let userLanguages = "";
    if (languages.length === 1) {
        userLanguages = languages[0];
    }
    else {
        languages.map((language, index) => {
            if (index + 1 === languages.length) {
                userLanguages += `${language}`;
            }
            else {
                userLanguages += `${language}+or+`;
            }
        });
    }
    const userInformation = await exports.getUserInformation(username);
    const followerInformation = await exports.countFollowerInformation(username);
    const searchInformation = await exports.searchUsers(username, languages);
    const userObj = {
        username: searchInformation.login,
        name: userInformation.name,
        avatarURL: searchInformation.avatar_url,
        followers: followerInformation
    };
    res.status(200).json(userObj);
};
exports.getUserInformation = async (username) => {
    const user = await github_1.github.get(`/users/${username}`);
    return user.data;
};
exports.countFollowerInformation = async (username) => {
    const followers = await github_1.github.get(`/users/${username}/following`);
    console.log(followers);
    return followers.data.length;
};
exports.searchUsers = async (username, languages) => {
    const search = await github_1.github.get(`/search/users?q=language:${languages}+user:${username}`);
    return search.data.items[0];
};
//# sourceMappingURL=index.js.map