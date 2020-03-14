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
        // let userLanguages: string = "";
        // if (languages.length === 1) {
        //   userLanguages = languages[0];
        // } else {
        //   languages.map((language: string, index: number) => {
        //     if (index + 1 === languages.length) {
        //       userLanguages += `${language}`;
        //     } else {
        //       userLanguages += `${language}+or+`;
        //     }
        //   });
        // }
        const searchInformation = yield exports.searchUsers(username, languages);
        const userInformation = yield exports.getUserInformation(username);
        const followerInformation = yield exports.countFollowerInformation(username);
        const userObj = {
            username: searchInformation.data.items.length > 0
                ? searchInformation.data.items[0].login
                : "",
            name: userInformation.name,
            avatarURL: searchInformation.data.items.length > 0
                ? searchInformation.data.items[0].avatar_url
                : "",
            followers: followerInformation
        };
        if (searchInformation.data.items.length > 0) {
            res.status(200).json(userObj);
        }
        else {
            res.status(200).json({ no: "NO" });
        }
    }
    catch (error) {
        console.log(error);
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
let index = 0;
exports.searchUsers = (username, languages) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield github_1.github.get(`/search/users?q=language:${languages[index]}+user:${username}`);
    if (search.data.items.length > 0) {
        index++;
        exports.searchUsers(username, languages);
    }
    return search;
});
//# sourceMappingURL=index.js.map