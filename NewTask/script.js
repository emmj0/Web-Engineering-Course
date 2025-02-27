async function getGitData() {
    const gitData = await fetch('https://api.github.com/users/walifile');
    const profile = await gitData.json();
    console.log(profile);
}
getGitData();

document.getElementById('btn').addEventListener('click', getGitData);
