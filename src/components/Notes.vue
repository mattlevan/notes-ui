<template>
  <div>
    <div v-show="mode === 'view'">
      <button id='edit' v-on:click='edit'>Edit</button>
    </div>
    <div v-show="mode === 'edit'">
      <br><br>
      <button v-on:click='view' type="submit">View</button>
      <br><br>
      <input v-model='tit' id='tit' placeholder='Title'></input>
      <br><br>
      <codemirror ref='myEditor'
                  :code='bod' 
                  :options='editorOptions'
                  @ready='onEditorReady'
                  @focus='onEditorFocus'
                  @change='onEditorCodeChange'>
      </codemirror>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'edit',
      bod: '',
      tit: '',
      aut: '',
      tim: Math.floor(new Date().getTime()),
      editorOptions: {
        tabSize: 2,
        indentUnit: 2,
        indentWithTabs: false,
        mode: 'text/x-markdown',
        lineNumbers: true,
        line: true
      }
    }
  },
  methods: {
    onEditorReady (editor) {
    },
    onEditorFocus (editor) {
    },
    onEditorCodeChange (newBod) {
      this.bod = newBod
    },
    view () {
      this.mode = 'view'
      var payload = {
        tim: this.tim,
        aut: window.urb.user,
        tit: this.tit,
        bod: this.bod
      }
      window.urb.send(payload,
        {
          appl: 'notes',
          mark: 'notes-note'
        },
        function callback (err, res) {
          if (err) {
            console.warn(err)
          }
        })
    },
    edit () {
      // pull code file from clay
      this.mode = 'edit'
    }
  },
  computed: {
    editor () {
      return this.$refs.myEditor.editor
    }
  },
  mounted () {
    window.urb.init(function () {
      window.urb.appl = 'notes'
      window.urb.bind('/', { appl: 'notes' }, function (e, d) {
        this.tim = d.tim
        this.aut = d.aut
        this.tit = d.tit
        this.bod = d.bod
      })
    })
  }
}
</script>

<style scoped>
</style>
