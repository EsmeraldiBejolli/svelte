import WebWorkers from './WebWorkers';
import SpecHelper from '../../../lib/helpers/SpecHelper';

describe('WebWorkers v1', () => {
    it('should mount tag', testMount);
    it('should be a Svelte component', testIsSvelteComponent);
    it('should be accessible', testIsAccessible);

    // /////////////////////////////////////////////////////////////////////////
    // /////////////////////////// TEST FUNCTIONS //////////////////////////////
    // /////////////////////////////////////////////////////////////////////////

    const data = {};

    let tag;
    let target;

    beforeEach(setupComponent);
    afterEach(teardownComponent);

    function setupComponent() {
        target = document.createElement('web-workers');
        document.body.appendChild(target);

        tag = new WebWorkers({target, data});
    }

    function teardownComponent() {
        target.remove();
        tag.destroy();

        tag = null;
    }

    function testMount() {
        expect(tag).to.exist();
    }

    function testIsSvelteComponent() {
        expect(tag._state).to.not.be.undefined();
    }

    function testIsAccessible() {
        return SpecHelper.accessibilityAudit();
    }
});
