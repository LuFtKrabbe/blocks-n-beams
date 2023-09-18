import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

import AboutUsSvg from './aboutUsSvg';

const AbouUsIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={AboutUsSvg} {...props} />;

export default AbouUsIcon;
