import CategoryList from "./categories/CategoryList";
import WalletList from "./wallets/WalletList";

function Aside() {
  return (
    <aside className="md:col-span-1">
      <div>
        <WalletList />
      </div>
      <div className="mt-8">
        <CategoryList />
      </div>
    </aside>
  );
}

export default Aside;
