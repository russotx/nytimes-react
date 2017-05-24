# DATA

- user input: topic, start, end = mutable
- article results: headline = immutable
- saved articles: headline, date, notes/snippet = mutable

# STATE 

#### { `Input` }
- `$topicInput`
- `$startYearnput`
- `$endYearInput`
> needed by Search  
> goes to api query event which receives a response  
> the response is needed by Results & Saved Articles 

- **{ `Input` }** -> `api call` -> **[ `resultTitles` ]**

#### ?[ `resultTitles` ]? - comes from api call
> could come in as props, don't need to mutate the data.
> needed by Results  
> goes to save event which updates the DB  
> hook into lifecycle to trigger events?
> the saved data is needed by savedArticle

#### (owned by SavedArticle)
- savedNoteTitle  
- savedNoteNotes  
- savedNoteDate 
> pulled from database  
> only needed by SavedArticles   

-------

# EVENTS
- search
  > query api
  > 
- save
- remove

------

# COMPONENTS

### Header 
> (always looks the same)
### SearchPane 
> (static layout)  
> INPUT DATA: from user- topic | start year | end year.  
> OUTPUT DATA: from api call - articles results   
> RENDER: user input in search boxes 

- TopicSearchBox
  > dynamic user input

- StartYearSearchBox
  > dynamic user input     

- EndYearSearchBox
  > dynamic user input

- SearchButton (always looks the same)
  > *!triggers remote api call!*

### ResultsPane
> data changes with every search request  
> INPUT DATA: results from api call  
> OUTPUT DATA: saved articles  
> RENDER: article results 

- ArticleResult
> content below gets generated dynamically  

  - Article
    - Headline
      > received from search
    - SaveButton 
      >(always looks the same)
      > *!triggers post to database!*  

### SavedArticlesBox
  > changes based on contents of database  
  > INPUT DATA: articles from database  
  > OUTPUT DATA: remove articles from database  
  > RENDER: articles from database 
- SavedArticle
  > content below is generated dynamically  
  
  - Headline
    > database value  
  - DateSaved
    > database timestamp  
  - Notes 
    > database value    
  - RemoveButton 
    > (always looks the same)  
    > *!triggers removal from database!*  


