import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import LeftView from '../LeftView.vue';

describe('LeftView', () => {
    it('renders properly', () => {
        const wrapper = mount(LeftView, { props: { msg: 'Hello Vitest' } });
        expect(wrapper.text()).toContain('Hello Vitest');
    });
});
