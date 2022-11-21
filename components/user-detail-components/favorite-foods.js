// db에, favorite 이라는, db를 만들어,

// user email 과 함께 food id 를 같이 저장

// 불러올때, 1. userid 에 저장된, foodid 를 불러옴 [배열형태로]
//          전체 foods 를 불러와, filter

// 관심 음식 불러오기는 버튼누르면, 아래로 쭉 펼쳐지게 하기

import FoodList from "../food-components/food-list";

function Favorites() {
  return <FoodList foodData />;
}

export default Favorites;
