import { Nav } from '../Nav';
import { Starfield } from '../Starfield';

export const Wrapper = ({ children }) => {
  return (
    <div className="app">
      <Starfield />
      <Nav />
      <main className="container">
        {children}
      </main>
    </div>
  )
}
