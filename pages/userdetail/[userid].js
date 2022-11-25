import UserDetailComponent from "../../components/user-detail-components/user-detail-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

function UserInfoPage(props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <div> ...loading</div>;
  }
  if (status == "unauthenticated") {
    router.replace("/");
  }
  return (
    <div>
      <Head>
        <title> userInfo </title>
      </Head>
      <UserDetailComponent
        useremail={session.user.email}
        username={session.user.name}
      />
    </div>
  );
}

export default UserInfoPage;
