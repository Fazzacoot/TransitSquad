import { RequestHandler } from "express";
import { github } from "../../apis/github";

//Interfaces
interface UserInformation {
  data: { name: string };
}

interface FollowerInformation {
  data: { length: number };
}

interface SearchInformantion {
  status: number;
  data: {
    items: [
      {
        login: string;
        avatar_url: string;
      }
    ];
  };
}
//Interfaces

//Langauge Index
let index = 0;

//Main API call - /api/v1/
export const searchGitUser: RequestHandler = async (req, res, next) => {
  try {
    const { languages, username } = req.body;

    const searchInformation = await searchUsers(username, languages[index]);
    //if no langauge at current index you have searched and not been able to get a valid result
    if (languages[index] === undefined) {
      res
        .status(200)
        .json({ error: "Unable to find user with provided information" });
    }
    //if api returns a result continue to gather all other informtion
    if (searchInformation.data.items.length > 0) {
      const userInformation = await getUserInformation(username);
      const followerInformation = await countFollowerInformation(username);
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
      searchGitUser(req, res, next);
    }
    //if the api returns a 200 but the items arry in empty try the next lnaguage provided by the user
    else {
      index++;
      searchGitUser(req, res, next);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Json object" });
  }
};

//get user information
export const getUserInformation = async (username: string) => {
  const user: UserInformation = await github.get(`/users/${username}`);
  return user.data;
};

//get all the followers
export const countFollowerInformation = async (username: string) => {
  const followers: FollowerInformation = await github.get(
    `/users/${username}/following`
  );
  return followers.data.length;
};

//search github for user and first language in array
export const searchUsers = async (username: string, language: string) => {
  const search: SearchInformantion = await github.get(
    `/search/users?q=language:${language}+user:${username}`
  );
  return search;
};
