const profileInfo = document.querySelector(".overview");
const username = "csymington1337";

const getUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const info = await userInfo.json();
    showUserInfo(info);
};

getUserInfo();

const showUserInfo = function (info) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
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
};