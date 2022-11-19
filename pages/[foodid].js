function FoodDetailPage(props) {
  return <div>food 아이디는{props.foodid}</div>;
}

export async function getServerSideProps(context) {
  const { foodid } = context.params;

  // foodid 로, db에서 findOne 해와서, 값 넣어주면됌
  return {
    props: { foodid },
  };
}

export default FoodDetailPage;
