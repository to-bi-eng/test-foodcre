// サンプルコンポーネントです！！色々変更して使ってください！！
import { Button, Stack, TextField } from "@mui/material";

export default function MyComponent() {
    return (
        <Stack component="form" width={560} gap="24px" aria-labelledby="login_heading">
            <TextField label="メールアドレス" />
            <TextField label="パスワード" />
            <Button variant="contained">ログイン</Button>
        </Stack>
    )
}