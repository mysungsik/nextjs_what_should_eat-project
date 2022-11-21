import AddingForm from "../../components/adding-components/adding-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { findAllFoods, connectDb } from "../../helper/db-util";

function AddingPage(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { allFoodsLength } = props;

  if (status === "loading") {
    <div>...loading</div>;
    return;
  }
  if (
    status === "unauthenticated" ||
    session.user.email !== "admin@admin.com"
  ) {
    router.replace("/");
    return;
  }

  return (
    <div>
      <AddingForm allFoodsLength={props.allFoodsLength} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await connectDb();
  const allFoods = await findAllFoods(client);

  return {
    props: {
      allFoodsLength: allFoods.length,
    },
  };
}

export default AddingPage;
