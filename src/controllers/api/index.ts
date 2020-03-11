import { RequestHandler } from "express";
import { github } from "../../apis/github";

interface UserInformation {
  data: { name: string };
}

interface FollowerInformation {
  data: { length: number };
}

interface SearchInformantion {
  data: {
    items: [
      {
        login: string;
        avatar_url: string;
      }
    ];
  };
}

export const searchGitUser: RequestHandler = async (req, res, next) => {
  const { languages, username } = req.body;
  let userLanguages: string = "";
  if (languages.length === 1) {
    userLanguages = languages[0];
  } else {
    languages.map((language: string, index: number) => {
      if (index + 1 === languages.length) {
        userLanguages += `${language}`;
      } else {
        userLanguages += `${language}+or+`;
      }
    });
  }

  const userInformation = await getUserInformation(username);
  const followerInformation = await countFollowerInformation(username);
  const searchInformation = await searchUsers(username, languages);

  const userObj = {
    username: searchInformation.login,
    name: userInformation.name,
    avatarURL: searchInformation.avatar_url,
    followers: followerInformation
  };
  res.status(200).json(userObj);
};

export const getUserInformation = async (username: string) => {
  const user: UserInformation = await github.get(`/users/${username}`);
  return user.data;
};

export const countFollowerInformation = async (username: string) => {
  const followers: FollowerInformation = await github.get(
    `/users/${username}/following`
  );
  console.log(followers);
  return followers.data.length;
};

export const searchUsers = async (username: string, languages: string[]) => {
  const search: SearchInformantion = await github.get(
    `/search/users?q=language:${languages}+user:${username}`
  );
  return search.data.items[0];
};
