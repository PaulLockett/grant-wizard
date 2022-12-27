import Container from '../components/container'
import Comment from '../components/comment'
import Image from 'next/image'

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Wecome to Grant Wizard!
          </h1>
          <p>
            This demo site is the early alpha of grant wizard a web app that
            takes a RPF (Request for Proposal) and generates a grant application.
          </p>

          <p>
            Here is what is build so far:
          </p>
          <ol>
              <li>1. PDF data extractor (WIP)</li>
              <li>2. PDF data sumarizer (next)</li>
              <li>3. Grant APP section maker</li>
          </ol>
          <Comment />

        </div>
      </Container>
    </>
  )
}

export default HomePage
