# &#127829;오늘 뭐먹지?

<hr style="border: solid 2px black;">
<br>

## &#127828;서비스소개

<hr style="border: solid 1px black;">
<br>

매일 고민하는 **"오늘 점심 뭐먹지? 오늘 저녁 어떻게 하지"?**

<br/><br/>

매일하는 고민들을 조금이나마 해결하기 위해서 만든 애플리케이션
<br><br>

**데모** : https://nextjs-personal-project-eamxz86yh-mysungsik.vercel.app/
<br><br>

## &#127828; 사용 기술

<hr style="border: solid 1px black;">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" style="border-radius:10px">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" style="border-radius:10px">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" style="border-radius:10px">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" style="border-radius:10px">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white" style="border-radius:10px">
<img src="https://img.shields.io/badge/Swiper-6332F6 ?style=for-the-badge&logo=Swiper&logoColor=white" style="border-radius:10px">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" style="border-radius:10px">
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white" style="border-radius:10px">

<br>

## &#127828;주요 기능

<hr style="border: solid 1px black;">

### &#129372; 로그인 및 회원가입

<hr>
<img src="/public/image/readme/login.jpg" style="width:200px"; style="height:400px"; >
<img src="/image/readme/signup.jpg" width="500" height="800">
<br>

- fetch 를 통해, 적절한 검증 후 DB에 정보 저장
- next-auth의 jwt Token 을 이용한 인증
- 서버에서 클라이언트에게, 토큰을 전달
- 전달받은 클라이언트가 쿠키에 토큰을 저장 후 필요시 요청헤더에 포함하여 전달
- 서버는 받은 토큰을 검증하고 응답
- Provider는 next-auth의 Credential Provider 로, 직접 적은 로그인 인증 로직을 활용하여 토큰 발급

### &#129372; 메인페이지

<hr>
<img src="/image/readme/mainpage.jpg" width="250px" height="400px">
<br>

- swiper API 를 통해, 회전하는 큐브 형태의 메인 페이지를 만들었습니다.
- 모든 음식, 랜덤 선택기, 칼로리 계산기, 컨택트 페이지
- Footer 의 HowtoUse 를 보면 페이지의 사용법이 간략히 나와있습니다.

### &#129372; 전체 음식

<hr>
<img src="/image/readme/allfood.jpg" width="500" height="800">
<br>

- Header 의 "뭐먹지" 에 가면, "카테고리별, 태그별" 로 정리된 모든 음식들이 나와있습니다.
- "모든음식을 데이터페칭" 후, filter 와 Array.includes("") 매서드를 통해, 걸러냅니다.

**<카테고리>**

```js
   function FoodCategoryHeader(props) {
       const { foodData } = props;
       const [insertFoodData, setInsertFoodData] = useState(foodData);

       function foodFilter(category) {
           const filteredFoods = foodData.filter((food) => food.category === category);

           setInsertFoodData(filteredFoods);
       }

       ...

       <li onClick={() => foodFilter("한식")}> 한식 </li>
```

**<태그>**

```js
   function FoodCategoryHeader(props) {
        const { foodData } = props;
        const [insertFoodData, setInsertFoodData] = useState(foodData);

        function foodFilter(taste) {
            const filteredFoods = foodData.filter((food) => food.taste.includes(taste));

            setInsertFoodData(filteredFoods);

       ...

        <li onClick={() => foodFilter("매콤")}> 매콤 </li>
  }
```

### &#129372; 랜덤 선택기

<hr>
<img src="/image/readme/random1.jpg" width="500" height="800">
<img src="/image/readme/random2.jpg" width="500" height="800">
<br>

- 모든 음식들 중, 랜덤으로 하나를 뽑아드립니다.
- 전체 음식의 length 를 뽑아, Math.ceil 과 Math.random 을 사용하여, 아이템을 나타냅니다.

```js
function randomSelect() {
  randomNumber = Math.ceil(Math.random() * foodData.length);

  setRandomFood(foodData[randomNumber - 1]);
  setShowFood(true);
}
```

### &#129372; 칼로리 계산기

<hr>
<img src="/image/readme/calorie-web.jpg" width="500" height="800">
<img src="/image/readme/calorie-mobile.jpg" width="300" height="600">
<br>

- 각 음식을 카테고리별로 정리, 카테고리를 누르면, 그에 해당하는 음식들을 나열하고
- 각 음식을 누른 후, 먹은 g 수를 적어, 총 칼로리를 계산합니다.
- useState 나, useRef 를 쓰기에는, 무한대로 늘어 날 수 있는 li 의 특성상, 가상DOM 이 아닌, 실제 DOM 에 접근하여, 직접 값에 접근하였습니다.

**<로직>**

1. 수량 변경
2. 수량을 기준, 다른 DOM 을 자동 변경
3. 변경된 DOM 전부를 지정(querySelectorAll)
4. 지정된 모든 DOM을 for 문을 사용하여, Array 형태로 만듬
5. Array 를 reduce 를 사용해 전부 합산

```js
function calculate(e) {
  let foodCalorie = e.target.parentElement.children[2].children[0].value;
  let quantity = e.target.parentElement.children[1].value;

  let total = foodCalorie * quantity;

  e.target.parentElement.children[3].children[0].value = Math.ceil(total);

  const alltotals = document.querySelectorAll(".total");

  let newArray = [];
  for (const alltotal of alltotals) {
    newArray.push(alltotal.value);
  }
  let totalCalories = newArray.reduce((sum, current) => +sum + +current);

  setTotalCalorie(Math.ceil(totalCalories));
}
```

### &#129372; 로그인 후 찜하기, 찜한 음식 목록

<hr>
<img src="/image/readme/user-zzim1.jpg" width="400" height="500">
<img src="/image/readme/user-zzim2.jpg" width="500" height="800">
<br>
- 로그인을 하게되면, 각 유저별로, 다른 찜 목록을 가지게됩니다.
- 찜한 음식들은, "내음식" 페이지에서 모든 찜한 음식을 보거나, "유저별 랜덤 선택기" 페이지에서 찜한 음식으로, 랜덤 선택을 할 수 있습니다.

**<로직>**

1. "로그인" 후, "음식 디테일 페이지"에서 "추가" 버튼을 누르면, "Array 형태의 foodId 와 userEmail"이 db에 넣어진다.

2. db에서 userEmail 과 같은 "data 가 있다면" (처음 추가한것이 아니라면)
   "다른 음식을 추가 할때", db에서 "Array 형태의 food Id" 를 불러와, 추가하고, Update 한다.

3. "Array 형태의 food Id" 를 체크해, "[foodid].js" 에서 params (foodId) 가 그 db의 food Id 와 같다면

   "isSameFoodId" 를 만들어, [true 또는 false] 로 값을 넣어,

   "true" (기존에 "추가" 눌렀던 음식) 면 "Array 형태의 foodId" 에서 그 food id 를 "삭제" 하고 Update
   "false"(처음 "추가" 를 누른 음식) 면 "Array 형태의 foodId" 에서 그 food id 를 "추가" 하고 Update

```js

            ...

        if (req.method === "POST") {
        const client = await connectDb();

        const { userEmail, foodId } = req.body;

        const findResult = await client         // userEmail 이 이미 존재하는 데이터인가?
            .db("eating")
            .collection("userFavorite")
            .findOne({ userEmail: userEmail });

            if (!findResult) {                      // "만약 없다면" Array 형태로, foodId 를 집어넣어준다.
                const foodArray = [foodId];

                const insertResult = await client
                    .db("eating")
                    .collection("userFavorite")
                    .insertOne({ userEmail, foodArray });

                res.status(200).json({ message: "success", insertResult });
                client.close();
                return;
            }

            const oldFoodArray = findResult.foodArray;                      // "있다면" ,그 data 안에 있는 foodArray를 꺼낸 후,
                                                                                // 현재 넣으려고 하는 foodId가 있는지 확인한다.
            const sameInArray = oldFoodArray.find((id) => id === foodId);

            if (!sameInArray) {
                let newFoodArray = oldFoodArray.push(String(foodId));       // "userEmail 이 이미 존재", "foodArray는 존재하지 않는다면"
                                                                             // foodArray에 새로운 foodId를 추가하여, newFoodArray를 만들어서 다시 넣어준다.
                const updateResult = await client
                    .db("eating")
                    .collection("userFavorite")
                    .updateOne(
                    { userEmail: userEmail },
                    { $set: { foodArray: oldFoodArray } }
                    );

                res.status(200).json({ message: "success", updateResult });
                client.close();
                return;
            }

            const newFoodArray = oldFoodArray.filter((id) => id !== String(foodId));    // "userEmail 이 이미 존재," "foodArray 도 이미 존재한다면"
                                                                                            // foodArray에서, 이미 존재하는 foodId를 제거하고,
            const updateResult = await client                                           // newFoodArray를 만들어서 다시 넣어준다.
                .db("eating")
                .collection("userFavorite")
                .updateOne(
                    { userEmail: userEmail },
                    { $set: { foodArray: newFoodArray } }
                );

                res.status(200).json({ message: "ghjghjghj", updateResult });
                client.close();
            }
            }

        export default handler;

```

### &#129372; 찜한 음식 랜덤 선택기

<hr>
<img src="/image/readme/user-random1.JPG" width="500" height="550">
<img src="/image/readme/user-random2.jpg" width="500" height="550">
<br>
- 찜한 음식들을 가지고, 랜덤 선택을 할 수 있습니다.
- 찜한 음식들의 DB에는, 음식들의 id만 Array 형태로 저장되어 있기에, for 과 .find() 를 통해 적절한 Data 를 가진 Array 로 변환시켜줍니다.

```js
function RandomSelectComponent(props) {

  const { allFoods, allFavoriteFoods } = props;             // 모든 음식의 데이터와, 모든 유저의 찜목록들
  const [favoritesData, setFavoritesData] = useState([]);   // 모든 찜한 음식들의 데이터

  useEffect(() => {
    if (status === "authenticated") {
      const userFavoriteFoodArray = allFavoriteFoods.find(  // 현 사용자의 찜목록만 가져온다.
        (food) => food.userEmail == session.user.email
      );

      let favorites = [];

      if (userFavoriteFoodArray) {
        for (const foodid of userFavoriteFoodArray.foodArray) {             // for과 find() 를 이용해, 적절한 형태의 데이터로 만들어줍니다.
          const result = allFoods.find((food) => food.id === foodid);
          favorites.push(result);
        }
      }
      setFavoritesData(favorites);
    }
  }, [status]);

  let randomNumber;

    ...

```

### &#129372; 비밀번호 변경

<hr>
<img src="/image/readme/user-changepw1.JPG" width="500" height="550">
<img src="/image/readme/user-changepw2.JPG" width="500" height="550">
<br>

- 비밀번호를 변경 할 수 있습니다.
- 현재 비밀번호를 옳게 입력했다면, bcrypt 의 compare 에 의해, 검증되고, 새 비밀번호를 적용 시킬 수 있습니다.

**<트리거>**

```js
async function submitHandler(e) {
  e.preventDefault();
  const currentPassword = currentRef.current.value;
  const newPassword = newRef.current.value;

  const patchPassword = { useremail, currentPassword, newPassword };

  const response = await fetch("/api/userdetail/change-password", {
    method: "PATCH",
    body: JSON.stringify(patchPassword),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  setMessage(responseData.message);
  if (responseData.data) {
    setSuccess(true);
  }
}
```

**<헬퍼>**

```js
// 한 유저의 상세정보
export async function getUserInfo(client, userEmail) {
  const findResult = await client
    .db("eating")
    .collection("userInfo")
    .findOne({ email: userEmail });
  return findResult;
}

// 비밀번호 변경시, 패스워드 체크
export async function checkPassword(inputPassword, dbPassword) {
  const checkPassword = await bcrypt.compare(inputPassword, dbPassword);
  return checkPassword;
}

// 비밀번호 생성/변경시, hash 패스워드
export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

// 비밀번호 변경 Query
export async function changePassword(client, userEmail, currentHashedPassword) {
  const patchResult = await client
    .db("eating")
    .collection("userInfo")
    .updateOne(
      { email: userEmail },
      { $set: { password: currentHashedPassword } }
    );
  return patchResult;
}
```

**API**

```js

import {connectDb, getUserInfo,checkPassword,hashPassword,changePassword,} from "../../../helper/userdetail-db-util";

async function handler(req, res) {
  const { useremail, currentPassword, newPassword } = req.body;
        ...

  const userInfo = await getUserInfo(client, useremail);

  if (!userInfo) {
    client.close();
    res.status(401).json({ message: "유저 정보가 없습니다." });
    throw new Error("유저 정보가 없습니다.");
  }

  const isValidPassword = await checkPassword(
    currentPassword,
    userInfo.password
  );

  if (!isValidPassword) {
    client.close();
    res.status(401).json({ message: "현재 패스워드가 다릅니다" });
    throw new Error("현재 패스워드가 다릅니다");
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    const patchResult = await changePassword(client, useremail, hashedPassword);
    res.status(200).json({ message: "변경 성공!", data: patchResult });
  } catch (error) {
    res.status(401).json({ message: "서버오류" });
    throw new Error("서버오류");
  }
  client.close();
```

### &#129372; 컨택트

<hr>
<img src="/image/readme/contact.jpg" width="500" height="500">
<br>

- 컨택트 페이지를 통해 Contact 를 할 수 있습니다.
