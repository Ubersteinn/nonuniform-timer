import { TestBed, async } from '@angular/core/testing';
import { Duration } from './duration';

describe('Duration', () => {

    it('should create a duration', async(() => {
        const duration = new Duration();
        expect(duration).toBeTruthy();
    }));

    it('should test consts', async(() => {

        expect(Duration.msInSec).toEqual(1000);
        expect(Duration.msInMin).toEqual(60000);
        expect(Duration.msInHour).toEqual(3600000);
        expect(Duration.secInMin).toEqual(60);
        expect(Duration.secInHour).toEqual(3600);
        expect(Duration.minInHour).toEqual(60);
    }));

    const msTests = [
        { input: 0,       expect: { h: 0, m: 0, s: 0,    ms: 0 } },
        { input: 1,       expect: { h: 0, m: 0, s: 0,    ms: 1 } },
        { input: 999,     expect: { h: 0, m: 0, s: 0,    ms: 999 } },
        { input: 1000,    expect: { h: 0, m: 0, s: 1,    ms: 0 } },
        { input: 1001,    expect: { h: 0, m: 0, s: 1,    ms: 1 } },
        { input: 59999,   expect: { h: 0, m: 0, s: 59,   ms: 999 } },
        { input: 60000,   expect: { h: 0, m: 1, s: 0,    ms: 0 } },
        { input: 60001,   expect: { h: 0, m: 1, s: 0,    ms: 1 } },
        { input: 3599999, expect: { h: 0, m: 59, s: 59,  ms: 999 } },
        { input: 3600000, expect: { h: 1, m: 0, s: 0,    ms: 0 } },
        { input: 3600001, expect: { h: 1, m: 0, s: 0,    ms: 1 } },
    ];
    msTests.forEach(test => {
        it('should create duration from milliseconds ' + test.input, async(() => {
            const duration = Duration.create(test.input);
            expect(duration.milliseconds).toEqual(test.expect.ms, 'ms');
            expect(duration.seconds     ).toEqual(test.expect.s,  's' );
            expect(duration.minutes     ).toEqual(test.expect.m,  'm' );
            expect(duration.hours       ).toEqual(test.expect.h,  'h' );
        }));
    });

    const timeTests = [
        { hours: 0, minutes: 0,  seconds: 0  },
        { hours: 0, minutes: 0,  seconds: 1  },
        { hours: 0, minutes: 0,  seconds: 59 },
        { hours: 0, minutes: 1,  seconds: 0  },
        { hours: 0, minutes: 1,  seconds: 1  },
        { hours: 0, minutes: 59, seconds: 59 },
        { hours: 1, minutes: 0,  seconds: 0  },
        { hours: 1, minutes: 0,  seconds: 1  },
    ];
    timeTests.forEach(test => {
        it('should create duration from time h=' + test.hours +
                                           ' m=' + test.minutes +
                                           ' s=' + test.seconds,
        async(() => {
            const duration = Duration.create(test);
            expect(duration.milliseconds).toEqual(0);
            expect(duration.seconds     ).toEqual(test.seconds,  's' );
            expect(duration.minutes     ).toEqual(test.minutes,  'm' );
            expect(duration.hours       ).toEqual(test.hours,  'h' );
        }));
    });

    const oddTimeTests = [
        { input: { hours: 0, minutes: 0,  seconds: 60   }, expect: { h: 0, m: 1, s: 0 } },
        { input: { hours: 0, minutes: 0,  seconds: 61   }, expect: { h: 0, m: 1, s: 1 } },
        { input: { hours: 0, minutes: 60, seconds: 0    }, expect: { h: 1, m: 0, s: 0 } },
        { input: { hours: 0, minutes: 61, seconds: 0    }, expect: { h: 1, m: 1, s: 0 } },
        { input: { hours: 0, minutes: 0,  seconds: 3600 }, expect: { h: 1, m: 0, s: 0 } },
        { input: { hours: 0, minutes: 0,  seconds: 3660 }, expect: { h: 1, m: 1, s: 0 } },
        { input: { hours: 0, minutes: 0,  seconds: 3661 }, expect: { h: 1, m: 1, s: 1 } },
        { input: { hours: 0, minutes: 61, seconds: 3661 }, expect: { h: 2, m: 2, s: 1 } },
    ];
    oddTimeTests.forEach(test => {
        it('should create duration from odd time h=' + test.input.hours +
                                               ' m=' + test.input.minutes +
                                               ' s=' + test.input.seconds,
        async(() => {
            const duration = Duration.create(test.input);
            expect(duration.milliseconds).toEqual(0);
            expect(duration.seconds     ).toEqual(test.expect.s,  's' );
            expect(duration.minutes     ).toEqual(test.expect.m,  'm' );
            expect(duration.hours       ).toEqual(test.expect.h,  'h' );
        }));
    });
});
