import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function CopyrightRight(props) {
    return (
      <Typography variant="body2" color="text.primary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.youtube.com/channel/UClLTMbxqK8LLSWm4bOdyx5Q" variant="body2">
          The inside shine
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }