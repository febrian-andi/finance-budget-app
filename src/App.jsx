import Aside from "./components/Aside";
import Header from "./components/Navbar";
import TransactionList from "./components/transaction/TransactionList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="grid md:grid-cols-4 gap-6">
        <main className="md:col-span-3 bg-white rounded-lg shadow p-6">
          <TransactionList />
        </main>
        <Aside />
      </div>
    </div>
  );
}

export default App;
