import Messages from './components/messages'
import Layout from '../layout/Layout'

export default function page() {

  return (
      <Layout>
        <main className="mb-24 lg:mb-0">
          <Messages />
        </main>
      </Layout>
  )
}  

