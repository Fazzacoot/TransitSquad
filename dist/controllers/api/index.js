"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("../../apis/github");
exports.searchGitUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const userInformation = yield exports.getUserInformation(username);
        const followerInformation = yield exports.countFollowerInformation(username);
        const searchInformation = yield exports.searchUsers(username, languages);
        const userObj = {
            username: searchInformation.data.items[0].login,
            name: userInformation.name,
            avatarURL: searchInformation.data.items[0].avatar_url,
            followers: followerInformation
        };
        res.status(200).json(userObj);
    }
    catch (error) {
        res.status(400).json({ error: "Invalid Json object" });
    }
});
exports.getUserInformation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield github_1.github.get(`/users/${username}`);
    return user.data;
});
exports.countFollowerInformation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield github_1.github.get(`/users/${username}/following`);
    return followers.data.length;
});
exports.searchUsers = (username, languages) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield github_1.github.get(`/search/users?q=language:${languages}+user:${username}`);
    return search;
});
//# sourceMappingURL=index.js.map