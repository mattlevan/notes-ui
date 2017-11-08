<template>
  <div>
    <div v-show="mode === 'view'">
      <button id='edit' v-on:click='edit'>Edit</button>
    </div>
    <div v-show="mode === 'edit'">
      <button v-on:click='view'>View</button>
      <br>
      <input v-model='title' id='title' placeholder='Title'></input>
      <codemirror ref='myEditor'
                  :code='code' 
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
      code: '**Markdown** _goes_ here.',
      mode: 'edit',
      title: '',
      author: '',
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
    onEditorCodeChange (newCode) {
      this.code = newCode
    },
    view () {
      this.mode = 'view'
      var payload = {
        tim: new Date(),
        aut: window.urb.user,
        tit: this.title,
        bod: this.code
      }
      window.urb.send(payload,
        {
          appl: 'notes',
          mark: 'notes-send'
        },
        function callback (err, res) {
          if (err) {
            console.warn(err)
          }
        })
    },
    edit () {
      // ensure latest revision of file is loaded
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
        this.time = d.tim
        this.author = d.aut
        this.title = d.tit
        this.code = d.bod
      })
    })
  }
}
</script>

<style scoped>
</style>
