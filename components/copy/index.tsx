import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { enqueueSnackbar } from 'notistack';

/**
 * @description: 复制组件
 * @return {*}
 */
const Copy = ({ msg, iconClass = 'text-sm' }: { msg: string, iconClass?: string }) => {
    // 复制 function
    const handleCopyClick = (data: string | number) => {
        try {
            data = data + "";
            const textField = document.createElement("textarea");
            textField.innerText = data;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
            enqueueSnackbar('复制成功', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('复制失败', { variant: 'error' });
        }
    };
    return (
        <>
            <ContentCopyIcon className={`cursor-pointer  ${iconClass}`} onClick={() => { handleCopyClick(msg || '') }}>copy</ContentCopyIcon>
        </>
    )
}

export default Copy