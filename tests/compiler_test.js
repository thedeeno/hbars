import Compiler from 'compiler';

describe('compiler', function () {

  it('compiles tags with classes and ids', function () {
    var template = Compiler.compile('%p#paragraph.foo.bar\n%a#link.baz.qux');
    expect(template).to.equal('<p id="paragraph" class="foo bar"></p>\n<a id="link" class="baz qux"></a>');
  });

  it('compiles nested tags', function () {
    var template = Compiler.compile('%p\n  %a');
    expect(template).to.equal('<p>\n  <a></a>\n</p>');
  });

  it('compiles nested helpers', function () {
    var template = Compiler.compile('%p\n\t- each things\n\t\t%p');
    expect(template).to.equal('<p>\n  {{#each things}}\n    <p></p>\n  {{/each}}\n</p>');
  });

  it('compiles expression', function () {
    var template = Compiler.compile('%p\n\t= name');
    expect(template).to.equal('<p>\n  {{name}}\n</p>');
  });

  it('compiles if/else', function () {
    var template = Compiler.compile('-if foo\n  %p\n-else\n  %a');
    expect(template).to.equal('{{#if foo}}\n  <p></p>\n{{else}}\n  <a></a>\n{{/if}}');
  });

  it('compiles unless', function () {
    var template = Compiler.compile('-unless foo\n  %p\n');
    expect(template).to.equal('{{#unless foo}}\n  <p></p>\n{{/unless}}');
  });

});
