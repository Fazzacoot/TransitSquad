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
//Interfaces
//Langauge Index
let index = 0;
//Main API call - /api/v1/
exports.searchGitUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { languages, username } = req.body;
        const searchInformation = yield exports.searchUsers(username, languages[index]);
        //if no langauge at current index you have searched and not been able to get a valid result
        if (languages[index] === undefined) {
            res
                .status(200)
                .json({ error: "Unable to find user with provided information" });
        }
        //if api returns a result continue to gather all other informtion
        if (searchInformation.data.items.length > 0) {
            const userInformation = yield exports.getUserInformation(username);
            const followerInformation = yield exports.countFollowerInformation(username);
            const userObj = {
                username: searchInformation.data.items[0].login,
                name: userInformation.name,
                avatarURL: searchInformation.data.items[0].avatar_url,
                followers: followerInformation
            };
            res.status(200).json(userObj);
        }
        //if api does not return a 200 retry the request
        else if (searchInformation.status !== 200) {
            exports.searchGitUser(req, res, next);
        }
        //if the api returns a 200 but the items arry in empty try the next lnaguage provided by the user
        else {
            index++;
            exports.searchGitUser(req, res, next);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Invalid Json object" });
    }
});
//get user information
exports.getUserInformation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield github_1.github.get(`/users/${username}`);
    return user.data;
});
//get all the followers
exports.countFollowerInformation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield github_1.github.get(`/users/${username}/following`);
    return followers.data.length;
});
//search github for user and first language in array
exports.searchUsers = (username, language) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield github_1.github.get(`/search/users?q=language:${language}+user:${username}`);
    return search;
});
//# sourceMappingURL=index.js.map