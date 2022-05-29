yarn - install packages;
yarn start - start project;

In process of development I used typescript, material ui, firebase, redux-toolkit, i18-next, responsive layout, sass, normalize.css.

First of all, I got data from https://docs.github.com/en/rest/users/users#list-users downloaded 30 users json and push to firebase with help of Refi app.

On the main page we have user list with pagination. Because database has only 30 users. I get them all. If will be much more. I will get totalcount to get page count for pagination and send get api request with limit and offset.

When we clicked on UserCard we will get to profile page with user description. Also we can click arrow back to return user List.

On Header we have link to community page. It is consists of 2 list with virtual scroll. On the left side list of users beyond the community list. And on the right sight list of users in community list. Also had a responsive layout.

