import AddingForm from "../components/adding-components/adding-form";
import { findAllFoods, connectDb } from "../helper/db-util";

function AddingPage(props) {
  return (
    <div>
      <AddingForm allFoodsLength={props.allFoodsLength} />
    </div>
  );
}

export async function getStaticProps(context) {
  const client = await connectDb();
  const allFoods = await findAllFoods(client);

  return {
    props: { allFoodsLength: allFoods.length },
  };
}
export default AddingPage;
