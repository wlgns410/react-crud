import React, { useContext, useEffect, useRef, useState } from 'react'
import { DiaryDispatchContext } from './App'

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext)

  // 돔 요소 접근하는 useRef 사용
  const authorInput = useRef()
  const contentInput = useRef()

  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  })

  const handleChangeState = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)

    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    console.log(state)
    if (state.author.length < 1) {
      // focus
      authorInput.current.focus()
      return
    }

    if (state.content.length < 5) {
      // focus
      contentInput.current.focus()
      return
    }

    onCreate(state.author, state.content, state.emotion)
    alert('저장성공')
    setState({
      author: '',
      content: '',
      emotion: 1,
    })
  }

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장</button>
      </div>
    </div>
  )
}
export default React.memo(DiaryEditor)
