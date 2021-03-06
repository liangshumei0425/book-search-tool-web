#### 1.	How long did you spend on the coding assignment?
- What would you add to your solution if you had more time? 
- If you didn't spend much time on the coding test, then use this as an opportunity to explain what you would add.
> I spent about 5 hours (in two nights) on this. 
>
> If I could have more time, I would add 
>
>     1) user management tool (e.g. Firebase, AWS Cognito, Social logins) with web analytics tool (e.g. Google Analytics), 
>     2) redux store to better manage search content, user state, and other shareable resources to improve data reusability and site efficiency, 
>     3) more granular responsiveness, 
>     4) typeahead with cached search phrases or popular words, 
>     5) search results parsing and grouping (e.g. group duplicate books), 
>     6) more test coverage,
>     7) a landing page (e.g. display popular books or search suggestions),
>     8) support to more languages
>
> Furthermore, if I did not have to use vanilla css and html tags, I would also prefer to leverage UI libraries such as Bootstrap and Material UI to create some of the common UI components and layouts

#### 2.	What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
> I think React hooks have been the most useful feature added after I started using React. I started learning React by using Class components. With hooks, the code is cleaner and can better separate UI and logics.Please see example below or see [the source file](https://github.com/liangshumei0425/book-search-tool-web/blob/main/src/components/SearchBar/index.js).

```javascript
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSearchSubmit(searchQuery);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
```

#### 3.	How would you track down a performance issue in production? Have you ever had to do this?
> I mostly use Network and Performance tabs in Chrome Developer Tool to debug and test. The Network tab shows how fast APIs and resource downloads are and Performance can generate generic reports for me to understance in highlevel how my site performs. For example, in this project, I had to add pagination after noticing that the __/search__ API takes too long in the Network tab. In some rare cases, I had to add timestamp in component rendering lifecycle steps to understand why something is slow.

#### 4.	How would you improve the API that you just used?
> Even though it's free, it can also ask for email verification to generate free API keys to access the APIs. This way, it can prevent some abuses. In terms of the API useability, I only used the basics of two APIs - __/search__ and __/covers__. They are pretty good in my use case. But if I were going to add typeahead and more filtering, I would think they should be added on the server side. For example, I need to download all search results and to sort locally right now. If they can be part of the server db query, it should be much faster in the frontend. As well, I would like the API to support empty search, to maybe return popular books or random collections. 

#### 5.	Please describe yourself using correctly formatted JSON.
```json
{
   "name": "Crystal Liang",
   "description": "Passionate software developer",
   "skills": {
      "fullStackDevelopment": [
         "React.js",
         "Redux",
         "Typescript",
         "Node.js"
      ],
      "blockchain": [
         "Solidity",
         "web3",
         "ERC20",
         "ERC1155"
      ]
   },
   "reactJsExperienceInYears": 3,
   "resumeUrl": "https://github.com/liangshumei0425/book-search-tool-web/blob/main/Crystal%20Resume%20.pdf"
}
```



