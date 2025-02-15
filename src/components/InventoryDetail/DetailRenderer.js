import React from 'react';
import PropTypes from 'prop-types';
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';
import { Spinner } from '@patternfly/react-core';
import DetailWrapper from './DetailWrapper';
import AccessDenied from '../../Utilities/AccessDenied';

const DetailRenderer = ({ showInventoryDrawer, isRbacEnabled, ...props }) => {
    const { hasAccess } = usePermissions('inventory', [
        'inventory:*:*',
        'inventory:*:read',
        'inventory:hosts:read'
    ]);
    if (hasAccess === undefined) {
        return <Spinner />;
    } else if (isRbacEnabled && hasAccess === false) {
        return <AccessDenied />;
    } else {
        return showInventoryDrawer ? <DetailWrapper {...props} /> : <React.Fragment {...props} />;
    }
};

DetailRenderer.propTypes = {
    showInventoryDrawer: PropTypes.bool,
    isRbacEnabled: PropTypes.bool
};

DetailRenderer.defaultProps = {
    showInventoryDrawer: false
};

export default DetailRenderer;
