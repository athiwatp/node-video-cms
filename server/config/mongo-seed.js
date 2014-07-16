'use strict';

var mongo = require('./mongo'),
    ObjectID = mongo.ObjectID,
    videos = require('../json/videos.json'),
    categories = require('../json/categories.json');

/**
 * Populates the database with seed data.
 * @param overwrite Overwrite existing database even if it is not empty.
 */
module.exports = function *(overwrite) {
  var count = yield mongo.users.count({}, {limit: 1});
  //overwrite = true;
  if (overwrite || count === 0) {

    // first remove any leftover data in collections
    var collerrmsg = 'ns not found' /* indicates 'collection not found' error in mongo which is ok */;
    for (var collection in mongo) {
      if (mongo[collection].drop) {
        try {
          yield mongo[collection].drop();
        } catch (err) {
          if (err.message !== collerrmsg) {
            throw err;
          }
        }
      }
    }

    // now populate collections with fresh data
    yield mongo.counters.insert({_id: 'userId', seq: users.length});
    yield mongo.users.insert(users);
    yield mongo.videos.insert(videos);
    yield mongo.categories.insert(categories);
  }
};

// declare seed data
var users = [
  {
    _id: 1,
    email: 'madhukard@gmail.com',
    password: 'pass',
    name: 'Madhukar Devaraju',
    picture: '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABaAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MSA2NC4xNDA5NDksIDIwMTAvMTIvMDctMTA6NTc6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwRDJGRDkxMjEwNTExRTM4ODVCRjE3Mzc1MDA2NDM2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwRDJGRDkwMjEwNTExRTM4ODVCRjE3Mzc1MDA2NDM2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjlFNkY0RjVDMzEyMTFFMjk5QkZBQ0I3ODZDODdCRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjlFNkY0RjZDMzEyMTFFMjk5QkZBQ0I3ODZDODdCRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAgEBAQICAgEBAgICAgICAgICAwIDAwMDAgMDBAQEBAQDBQUFBQUFBwcHBwcICAgICAgICAgIAQEBAQICAgUDAwUHBQQFBwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAj/wAARCAAyADIDAREAAhEBAxEB/8QArQAAAwEBAQAAAAAAAAAAAAAACAkKBwYEAQACAgMBAQAAAAAAAAAAAAAGBwQFAAMIAQIQAAAFAgQBCQMHCwUAAAAAAAECAwQFBgcAERIIEyExYTMUNDU2CVEVFoEiUmNVOArwQXHRMiNDo1Q3GWKyU5NlEQABAgQEAgQLBgcAAAAAAAABAAIRMQMEIUEFBlESYXGRofCBscHhIjJSExQ08XIjMxUH0UJiolM1F//aAAwDAQACEQMRAD8Av4xixZ3da7dsbGUFUN0bxV5F21t5SqXGqCsJh4ixYtiCYCFAyiwgAmOYQKQgZmMYQAoCIgGPQ0mS8JAU2d7vxW+x6gKvf0zaK1tX36jIpVZJ3WrYWEBFrcMpRIo195mMuomcRMGoyRBDLPIQEBxIFscyvhrnmQRGbH/xGex/d1OxtBVwjI7ZrlTLkW0PF1Iqg7gXZjmKmgVOZaARFNRUxsgIuRPlyADCI5Y+HUCFsLHAYhGRu5vOwtneCk6pm4NxUzWg0ifA9Is+Go8n6rkGypIti2IJg1HMoqZYxhyKmREVDiUgZ4X25tcbbVxhEtER1yCcH7cbVqX1rVgeUVC1pP8AQDzPh14BcBtusrXE7cCau9c+TQqC8ldlFWvJ8phGPhmIJK9ihI3XkbszcxzZDlqWUE6pgDMAKtKGkXOqVnEHHEklNbeWr2ek6eyiwQaCA0CZhMoreAT2hz6cUX6X0oV+bdwRnY6jXOah8/Et1PeXdRvCshsLtI/lKiQg4JKUj7SxrcyxZOr5Y6ixXronzSqJtGPD4ZjCJUxOc3IIjnlW9p29MvcrHTNNdc1OVs0lO6fpE+olstplzVsxYD4xYPm5PdtfIx7SfbxThVMxVFeDpVImqQps0jKFEAOACHNywWa5TeImLQVeu0J0S1jg5wyBEUEtJ2q3lMXqLiMtdPvEljGWjzPIIyybk5QEdRnDkheU4iIiOr25Yx+u2TZvEVvo7T1F4iKZgq9vQNkpDcva+51yrqulGdbWCn16XqCLkFHjlSkSqMEVnbgqTg6hgVfEBNIDgGrQjw89BRwAa3tw3d4HUsGOxJyHpKZ+hb/Gm6UaNYfiMwaM3cBHgFVVDW3iRPDIzdON2Lig5RxIUY8bOFDKK8NsZmm6XMAEzOom6VKdMwCUufJzAODWz0ujbU+VghAeM9JSX1bW7m+qmrVdGJlkOgcFkWfR/FywjOdNf5j+CMbHRaRinYtm7qad9afc/WVZ2i+HJKnoFrCwM+odR2m5p8iLVKPkWqyyKQJg+ImIKEJmAGIYmodI5he6LpnKBwKOts2TnUiRmndSEw9dRarNB83VbqEEh49QCCYSCGWQlHnDA0+/qupcrXYcFYW2m0mV+ZzTHjkgav5T9KR9IuWsg2iWh3580YxJugDpQQATBwxJ84B5OcAwH3gc0xMIpr6RdOqYDmI7kNvo22npak7m7/q3ZERYzld1tTrhWFRW0ZMk6PaARZVuQQARUVVVDWYvOUch58OHadYPtRxCSu+6DmXksDmnqqhm+T6UFv8AeTBK+SDmn1PGPOhH09I94045tgOmacPOEY+OlUl0oS9O3y4sBc+8yFqrhx9ppe9ML2O1NcmYvnzyDkiy7moJJZQHoqonKstJjwSIBpTyMIlAw5iq9asKlK6JwLSYiMc07tJ163urFjSHfFYIOhywIAAbDOQx5s80uGx/p+erC23EUnJ3J3Vnj7aMnSA3Cnxq1xOe/GGoQX91xjhqAIHULkBRVKTRny55ZDX1rKtWIa4NaOIh9qtjuDSrSgXsD31PdMYR6TLsil3buNve8Ord0d0V5S5MlUtrICScsaMFpVMxDKsGqThVuksuWK0gKpiFMIpmAP05DnilpXQtiWCBdxgCjlulsvqDapBAIBgHEQ7FSN6R1rT0DY2q6lkpE0zKVLIM2K9ROVzLvnbeAjk2pTuVFOUTAoqoACI5iAAI4aG0GONA1HAAuPkSF/cSq1ty2i0mDBnxPoAR03ov/bux0S0qquZosbGC7JGi0Bu+XkXTl2oVNBFizaN1VXKiqhdBNIATkMOr5uWLfVtYtrNvNVdAd/iCGNE0C71BxZQYXET4DrKyTtiXT1vF5v4f6+jHNfzjP7u5N39Hq8Mu9GkdQpBDUYCgIgGYiABmYQKHP7RHLHVaQhdjBTg7wt4d4ld0FBx7NoxkLYUXUdQIysXDzDB++h4uKgXvFeuG7A6hl1DnbmXUHl4BCCTLPWJgTcfPW5gGmLZdKaW0rejb021HOHrzB7guCa+oBXluUrn3jnZpOXmHT9COsDTspETvwhKxLMxVnI+9o9FRBtIugN+6MsfImkCiGRxEFra3b2EvJiQnfebbpXtJtJreVkyQQD6RxS76m3u1LWtfVzXMukzpOEle3PK1hIhZd2zTBq3O6T4h9IpLOiiOkeCYR+cBRDmxBex1WqITJRNVaywtIQi1owMcU4/YTuSa3r2ZUZW+1GoG7Skbg1A6UmzSrcX81Fs/hiNbvAKxKsKKboZFJcSHcEOmAFMIENnhrbgua+lW7KVERLo9OQxASD25olnrV5Vr3jiGsAM4AxLsCeAEJYrzFu3tsshcqqXlz7uJSl3lGcerXVWT783a5Y8KxBqRIXx0+yiugRcqh2zMhjk4oG4Qas8AdfbVzcfjXj+QHjPsy8MEeX+9bJtL5LS6XxCMByj1R1mZ6+9Zh/lmtR9kOfMnYPBqk8qfanVfzP5ONH6To/vu7R2yQl8Dcf8AhE4yPZNMb37b9LG7W3bKh7y3Ig6Epidj+1VLJmlTq1ImBlTGRQYw0cks7XOsVE2g5dIAOQiYoAIi5NWdcve2jRb7UzkAljtmztmU6lzWfiz2W5vJ8gGZSb9n2+Oit5FTXhoCw1kDUTt0tQk5I1uJUp0XtWzDypF+zt0EhQ1FYJpR7ZdMyZFVDGTUAphD89rZaKyj6zjE4rfZ1DWbzHBoIEOmBJ8OpZZeGp4rbVQklZCrqcrZpbGq+LJWfr+gH8cm8jSOSEUc09MMZsh0HBWRxybqAA60RT1BmGYp3VNHFtXIcSHdxCeeg7juGGFCDg0wljhwklDXCr1kxihnXSb6EoahU11KaZyBGJZeZklS6W4uUYvNFP8AeCA6CftGyHIALiFpVhz1wG+sSVM3Tr1xVo81b1QFnVHSV/7TbdJGH27V/NWmuASH7TDuIJ2ozOeQKsrKmTUIUdCpFVgOQSHKYoifPLPHRNGzZ8ANIjyiCUF3Y/FYWGbvKY8veAM5oLLH+tDukpOo2ErdGlKf3ES0Sg5RpUlSxpBXjJB5wgcPCESLoO5W4BCrHMQDiBcgMXlERbcOz7fUaQY4loByQ9tLelfSKz3saCXgA+IxRMf5hL/fYzzr/ffUI+J/0Xf+5f6efowJ/wDIbP3j2og/6vqHROMsuHpQy+oH99S7XjfiaXmDx7uKXfvr/wCo+s1YZun/AJfjKXlxMSkJKjT0EPuv3c7l55U7t4p4NH96+r/4ujViQ6aItL+nH3j1Sb3+Za5vS+7XcjzP/cFDzT1/hgeXv/O+h0asAW/vZpyz+99nnRfsr/Y1Pak2UpCfSp97q+CUb3rx9h3jqOtDren2dOKfYP1olI+A6Vd/uP8AR/zebxoidoPURfnHmT/udz96bdb0ez5cOl0vDgUH2P5Wcs5+0zwHSp/bi/eyvf4N5vqvy/4H4o58N+o+h0YraaX+qfUv+8fKu4/7Or/L5cTFCX//2Q=='
  }
];
