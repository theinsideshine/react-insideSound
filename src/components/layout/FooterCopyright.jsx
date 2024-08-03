import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function CopyrightRight(props) {
    return (
      <Typography variant="body2" color="text.primary" align="center" {...props}>
         <Link color="inherit" href="https://github.com/theinsideshine/springcloud-insidesound/tree/monolithic_backend" variant="body2">
          GitHub/BackEnd
        </Link>{' '}
        {'-Copyright © '}
        <Link color="inherit" href="https://www.youtube.com/channel/UClLTMbxqK8LLSWm4bOdyx5Q" variant="body2">
          The inside shine
        </Link>{' '}
        {new Date().getFullYear()}
        {'-'}
        <Link color="inherit" href="https://github.com/theinsideshine/react-insideSound" variant="body2">
          GitHub/FrontEnd
        </Link>{'-'}
        <Link color="inherit" href="https://youtu.be/JTr69ZPiLQg" variant="body2">
          Demo de uso
        </Link>{' '}

      </Typography>
    );
  }