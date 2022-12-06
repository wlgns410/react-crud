import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList'


// const dummyList = [
//   {
//     id: 1,
//     author: '이지훈',
//     content: '하이1',
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: '이지훈1',
//     content: '하이2',
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '이지훈2',
//     content: '하이3',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
// ]

function App() {
  const [data, setData] = useState([])
  const dataId = useRef(0)
  const getData = async() =>{
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    console.log(res);

    const initData = res.slice(0,20).map((it)=>{
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() *5)+1,
        created_date : new Date().getTime(),
        id: dataId.current++
      }
    });
    setData(initData);
  };

  useEffect(()=>{
    getData();
  },[])

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime()
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    }
    dataId.current += 1
    setData([newItem, ...data])
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((it) => it.id !== targetId)
    setData(newDiaryList)
  }
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it,
      ),
    )
  }
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onDelete={onRemove} diaryList={data} />
    </div>
  )
}

export default App
