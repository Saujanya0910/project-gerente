import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {

  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  // fetch realtime data for specific doc
  useEffect(() => {
    setIsPending(true)

    // ref to collcn
    const ref = projectFirestore.collection(collection).doc(id)
    
    // fetch data
    const unsub = ref.onSnapshot(snapshot => {

      if(snapshot.data()) {
        setDocument({ ...snapshot.data(), id: snapshot.id })
        setError(null)
        setIsPending(false)
      }
      else {
        setError('No such document exists')
      }
    }, err => {
      setError('Could not fetch data')
      setIsPending(false)
    })

    // cleanup
    return () => unsub()

  }, [collection, id])

  return { document, error, isPending }
}