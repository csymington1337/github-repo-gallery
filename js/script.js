const profileInfo = document.querySelector(".overview");
const username = "csymington1337";
const repoList = document.querySelector(".repo-list")
const repoElement = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const getUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const info = await userInfo.json();
    showUserInfo(info);
};

getUserInfo();

const showUserInfo = function (info) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${info.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${info.name}</p>
        <p><strong>Bio:</strong> ${info.bio}</p>
        <p><strong>Location:</strong> ${info.location}</p>
        <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
      </div>
    `;
    profileInfo.append(div);
    getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoInfo = await fetchRepos.json();
    showRepos(repoInfo);
};

const showRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getReposInfo(repoName);
    }
});

const getReposInfo = async function (repoName) {
    const fetchRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepo.json();
    console.log(repoInfo);

    //Grab the langugages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //make a list of the languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    showReposInfo(repoInfo, languages);
};

const showReposInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);

    repoData.classList.remove("hide");
    repoElement.classList.add("hide");
};
