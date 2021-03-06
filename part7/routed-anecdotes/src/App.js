import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch,
  useHistory
} from "react-router-dom"
import { useField } from './hooks/index.js'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (<div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/create">create</Link>
      <Link style={padding} to="/about">about</Link>
  </div>)
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote,index) => 
        <Link key={index} to={`/anecdotes/${index + 1}`}><li key={anecdote.id} >{anecdote.content}</li></Link>
      )}
    </ul>
  </div>
)

const Anecdote = ({anecdotes}) => {
  debugger;
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = anecdotes.find(item => item.id === match.params.id)
  return <div>
    <h3>{ anecdote.content }</h3>
    <p>has {anecdote.vote} votes</p>
  </div>
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author') 
  const info = useField('info')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/anecdotes')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset={null} />
        </div>
        <div>
          author
          <input {...author} reset={null}/>
        </div>
        <div>
          url for more info
          <input {...info} reset={null}/>
        </div>
        <input type="submit" name="submit" value="create" /> 
        <input type="button" name="submit" value="reset" onClick={handleReset}/>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  
  const [notification, setNotification] = useState('')
  let timeout = null
  const addNew = (anecdote) => {
    timeout && clearTimeout(timeout)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    },10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        { notification && <p>{ notification }</p>}
        <Switch>
         <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes}/> 
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
      
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;
