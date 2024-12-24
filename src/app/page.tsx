// サンプルページです！！色々変更して使ってください！！
import { Stack, Typography } from "@mui/material";

import MyComponent from "@/components/myComponent";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Stack height="100lvh" justifyContent="center" alignItems="center" gap="32px">
        <Typography id="login_heading" variant="h1" fontSize="1.5rem">ログインフォーム（サンプル）</Typography>
        <MyComponent />
      </Stack>
    </>
  );
}
