import { MaxNombrePipe } from './max-nombre.pipe';

describe('MaxNombrePipe', () => {
  it('create an instance', () => {
    const pipe = new MaxNombrePipe();
    expect(pipe).toBeTruthy();
  });
});
